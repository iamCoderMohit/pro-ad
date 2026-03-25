import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Loading } from "../loading/loading";
import { Error } from "../error/error";

@Component({
  selector: 'app-navbar',
  imports: [Loading, Error],
  templateUrl: './navbar.html',
})
export class Navbar {
  constructor(
    private router: Router,
    private auth: Auth,
  ) {}
  loading = false;
  errMsg = signal('');

  home() {
    this.router.navigate(['/']);
  }
  pages() {
    this.router.navigate(['/pages-list']);
  }
  signup() {
    this.router.navigate(['/signup']);
  }
  login() {
    this.router.navigate(['/login']);
  }
  logout() {
    this.loading = true;

    this.auth.logout().subscribe(
      () => {
        this.router.navigate(['/login']);
        this.loading = false;
      },
      () => {
        this.errMsg.set("Can't log out");
        this.loading = false;

        setTimeout(() => {
          this.errMsg.set('');
        }, 3000);
      },
    );
  }
}
