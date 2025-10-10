import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [guestGuard],
        children: [
            { path: '', redirectTo: "login", pathMatch: 'full' },
            { path: 'login', component: LoginComponent, title: 'Login' },
            { path: 'register', component: RegisterComponent, title: 'Register' },
            { path: 'forgetpassword', component: ForgetpasswordComponent, title: 'Forget Password' }
        ]
    },
    {
        path: '',
        component: BlankLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: "home", pathMatch: 'full' },
            { path: 'home', component: HomeComponent, title: 'Home' },
            { path: 'products', component: ProductComponent, title: 'Products' },
            { path: 'categories', loadComponent: () => import('./components/categories/categories.component').then((c) => c.CategoriesComponent), title: 'Categories' },
            { path: 'categoryDetails/:id', loadComponent: () => import('./components/category-details/category-details.component').then(c => c.CategoryDetailsComponent), title: 'Category' },
            { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then((c) => c.CartComponent), title: 'Cart' },
            { path: 'details/:id', loadComponent: () => import('./components/details/details.component').then((c) => c.DetailsComponent), title: 'Details' },
            { path: 'allorders', loadComponent: () => import('./components/allorders/allorders.component').then((c) => c.AllordersComponent), title: 'All Orders' },
            { path: 'orders/:id', loadComponent: () => import('./components/orders/orders.component').then((c) => c.OrdersComponent), title: 'Orders Confirmation' }
        ]
    },
    { path: '**', loadComponent: () => import('./components/notfound/notfound.component').then((c) => c.NotfoundComponent), title: 'Not Found Page' }
];
