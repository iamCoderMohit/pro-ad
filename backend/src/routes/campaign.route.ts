import express from "express";
import verifyUser from "../middleware/auth";
import { Campaign } from "../zod/campaign";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { db } from "../config/drizzle";
import { campaign } from "../db/schema";
import { and, eq } from "drizzle-orm";

const campaignRouter = express.Router();

campaignRouter.use(verifyUser);

campaignRouter.post("/create", async (req, res) => {
  try {
    const body = req.body;
    const userId = req.user?.id;

    const result = Campaign.safeParse(body);

    if (!result.success) {
      console.log(result.error);
      return errorResponse(res, "Invalid input");
    }

    await db.insert(campaign).values({
      page_id: body.page_id,
      user_id: userId,
      name: body.name,
      objective: body.objective,
      budget_type: body.budget_type,
      budget_amount: body.budget_amount,
      end_date: new Date(body.end_date),
    });

    return successResponse(res, "Campaign created");
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Can't create campaign");
  }
});

// get all campaigns for a page
campaignRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    const camp = await db.query.campaign.findMany({
      where: eq(campaign.page_id, id)
    })

    return successResponse(res, camp)
  } catch (error) {
    console.error(error)
    return errorResponse(res, "Can't find campaigns")
  }
})

// get all your campaigns
campaignRouter.get("/my", async (req, res) => {
  try {
    const userId = req.user?.id;

    const myCamp = await db.query.campaign.findMany({
      where: eq(campaign.user_id, userId),
    });

    return successResponse(res, myCamp);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Can't retrieve your pages");
  }
});

// get single campaign
campaignRouter.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const camp = await db.query.campaign.findFirst({
        where: and(eq(campaign?.id, id), eq(campaign.user_id, userId))
    });

    return successResponse(res, camp!);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Can't find campaign");
  }
});

// update campagin
campaignRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { name, objective, budget_amount, budget_type, end_date } = req.body;

    await db
      .update(campaign)
      .set({
        name,
        objective,
        budget_amount,
        budget_type,
        end_date: new Date(end_date),
      })
      .where(and(eq(campaign.id, id), eq(campaign.user_id, userId)));

    return successResponse(res, "Campaign has been updated");
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Can't update campaign");
  }
});

// delete a campaign
campaignRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user?.id

        await db.delete(campaign)
            .where(and(eq(campaign.id, id), eq(campaign.user_id, userId)))

        return successResponse(res, "Campaign deleted")
    } catch (error) {
        console.error(error)
        return errorResponse(res, "Can't delete campaign")
    }
})

// update the status of a campaign
campaignRouter.patch("/:id/status", async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user?.id
        const {status} = req.body

        await db.update(campaign)
            .set({status})
            .where(and(eq(campaign.id, id), eq(campaign.user_id, userId)))

        return successResponse(res, "Status changed")
    } catch (error) {
        console.error(error)
        return errorResponse(res, "Can't update status")
    }
})

export default campaignRouter;
