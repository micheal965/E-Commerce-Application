import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { DetailsComponent } from './components/details/details.component';

export const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, canActivate: [guestGuard], children: [
            { path: '', redirectTo: "login", pathMatch: 'full' },
            { path: 'login', component: LoginComponent, title: 'Login' },
            { path: 'register', component: RegisterComponent, title: 'Register' }
        ]
    },
    {
        path: '', component: BlankLayoutComponent, canActivate: [authGuard], children: [
            { path: '', redirectTo: "home", pathMatch: 'full' },
            { path: 'home', component: HomeComponent, title: 'Home' },
            { path: 'products', component: ProductComponent, title: 'Products' },
            { path: 'categories', component: CategoriesComponent, title: 'Categories' },
            { path: 'brands', component: BrandsComponent, title: 'Brands' },
            { path: 'cart', component: CartComponent, title: 'Cart' },
            { path: 'details/:id', component: DetailsComponent, title: 'Details' }
        ]
    },
    { path: '**', component: NotfoundComponent }
];
