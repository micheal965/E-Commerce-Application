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

export const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            { path: '', redirectTo: "login", pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
    {
        path: '', component: BlankLayoutComponent, children: [
            { path: '', redirectTo: "home", pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'products', component: ProductComponent },
            { path: 'categories', component: CategoriesComponent },
            { path: 'brands', component: BrandsComponent },
            { path: 'cart', component: CartComponent }
        ]
    },
    { path: '**', component: NotfoundComponent }
];
