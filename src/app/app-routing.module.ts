import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { AppMainComponent } from './_primeng/app.main.component';
import { BlocksComponent } from './_primeng/blocks/blocks/blocks.component';
import { ButtonDemoComponent } from './_primeng/demo/view/buttondemo.component';
import { ChartsDemoComponent } from './_primeng/demo/view/chartsdemo.component';
import { DashboardDemoComponent } from './_primeng/demo/view/dashboarddemo.component';
import { DocumentationComponent } from './_primeng/demo/view/documentation.component';
import { EmptyDemoComponent } from './_primeng/demo/view/emptydemo.component';
import { FileDemoComponent } from './_primeng/demo/view/filedemo.component';
import { FloatLabelDemoComponent } from './_primeng/demo/view/floatlabeldemo.component';
import { FormLayoutDemoComponent } from './_primeng/demo/view/formlayoutdemo.component';
import { InputDemoComponent } from './_primeng/demo/view/inputdemo.component';
import { InvalidStateDemoComponent } from './_primeng/demo/view/invalidstatedemo.component';
import { ListDemoComponent } from './_primeng/demo/view/listdemo.component';
import { MediaDemoComponent } from './_primeng/demo/view/mediademo.component';
import { MessagesDemoComponent } from './_primeng/demo/view/messagesdemo.component';
import { MiscDemoComponent } from './_primeng/demo/view/miscdemo.component';
import { OverlaysDemoComponent } from './_primeng/demo/view/overlaysdemo.component';
import { PanelsDemoComponent } from './_primeng/demo/view/panelsdemo.component';
import { TableDemoComponent } from './_primeng/demo/view/tabledemo.component';
import { TreeDemoComponent } from './_primeng/demo/view/treedemo.component';
import { AppAccessdeniedComponent } from './_primeng/pages/app.accessdenied.component';
import { AppCalendarComponent } from './_primeng/pages/app.calendar.component';
import { AppCrudComponent } from './_primeng/pages/app.crud.component';
import { AppErrorComponent } from './_primeng/pages/app.error.component';
import { AppLoginComponent } from './_primeng/pages/app.login.component';
import { AppNotfoundComponent } from './_primeng/pages/app.notfound.component';
import { AppTimelineDemoComponent } from './_primeng/pages/app.timelinedemo.component';
import { IconsComponent } from './_primeng/utilities/icons.component';
import { CompanyComponent } from './modules/admin/fichiers/components/company/company.component';
import { AgencyComponent } from './modules/admin/fichiers/components/agency/agency.component';
import { BookingComponent } from './modules/admin/fichiers/components/booking/booking.component';
import { BusComponent } from './modules/admin/fichiers/components/bus/bus.component';
import { CancellationComponent } from './modules/admin/fichiers/components/cancellation/cancellation.component';
import { CashRegisterComponent } from './modules/admin/fichiers/components/cash-register/cash-register.component';
import { CustomerComponent } from './modules/admin/fichiers/components/customer/customer.component';
import { ExpenseComponent } from './modules/admin/fichiers/components/expense/expense.component';
import { PermissionComponent } from './modules/admin/fichiers/components/permission/permission.component';
import { RoleComponent } from './modules/admin/fichiers/components/role/role.component';
import { RouteComponent } from './modules/admin/fichiers/components/route/route.component';
import { ScheduleComponent } from './modules/admin/fichiers/components/schedule/schedule.component';
import { StaffComponent } from './modules/admin/fichiers/components/staff/staff.component';
import { StopoverComponent } from './modules/admin/fichiers/components/stopover/stopover.component';
import { TerminalComponent } from './modules/admin/fichiers/components/terminal/terminal.component';
import { UserComponent } from './modules/admin/fichiers/components/user/user.component';
import { AccountComponent } from './modules/admin/fichiers/components/account/account.component';
import { TransactionComponent } from './modules/admin/fichiers/components/transaction/transaction.component';
import { CashTransactionComponent } from './modules/admin/fichiers/components/cash-transaction/cash-transaction.component';
import { InventoryComponent } from './modules/admin/fichiers/components/inventory/inventory.component';



@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardDemoComponent},
                    {path: 'company', component: CompanyComponent},
                    {path: 'agency', component: AgencyComponent},
                    {path: 'booking', component: BookingComponent},
                    {path: 'bus', component: BusComponent},
                    {path: 'cancellation', component: CancellationComponent},
                    {path: 'customer', component: CustomerComponent},
                    {path: 'expense', component: ExpenseComponent},
                    {path: 'cashRegister', component: CashRegisterComponent},
                    {path: 'permission', component: PermissionComponent},
                    {path: 'role', component: RoleComponent},
                    {path: 'route', component: RouteComponent},
                    {path: 'schedule', component: ScheduleComponent},
                    {path: 'staff', component: StaffComponent},
                    {path: 'stopover', component: StopoverComponent},
                    {path: 'terminal', component: TerminalComponent},
                    {path: 'user', component: UserComponent},
                    {path: 'account', component: AccountComponent},
                    {path: 'transaction', component: TransactionComponent},
                    {path: 'cashTransaction', component: CashTransactionComponent},
                    {path: 'inventory', component: InventoryComponent},
                    {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                    {path: 'uikit/input', component: InputDemoComponent},
                    {path: 'uikit/button', component: ButtonDemoComponent},
                    {path: 'uikit/table', component: TableDemoComponent},
                    {path: 'uikit/list', component: ListDemoComponent},
                    {path: 'uikit/tree', component: TreeDemoComponent},
                    {path: 'uikit/panel', component: PanelsDemoComponent},
                    {path: 'uikit/overlay', component: OverlaysDemoComponent},
                    {path: 'uikit/media', component: MediaDemoComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./_primeng/demo/view/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/message', component: MessagesDemoComponent},
                    {path: 'uikit/misc', component: MiscDemoComponent},
                    {path: 'uikit/charts', component: ChartsDemoComponent},
                    {path: 'uikit/file', component: FileDemoComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'pages/empty', component: EmptyDemoComponent},
                    {path: 'pages/crud', component: AppCrudComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'components/charts', component: ChartsDemoComponent},
                    {path: 'components/file', component: FileDemoComponent},
                    {path: 'documentation', component: DocumentationComponent},
                    {path: 'blocks', component: BlocksComponent},
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'accessdenied', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
