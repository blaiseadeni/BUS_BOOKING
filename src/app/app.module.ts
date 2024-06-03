import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

// PrimeNG Components for demos
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {BadgeModule} from 'primeng/badge';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipModule} from 'primeng/chip';
import {ChipsModule} from 'primeng/chips';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {GalleriaModule} from 'primeng/galleria';
import {ImageModule} from 'primeng/image';
import {InplaceModule} from 'primeng/inplace';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {KnobModule} from 'primeng/knob';
import {LightboxModule} from 'primeng/lightbox';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {SkeletonModule} from 'primeng/skeleton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SliderModule} from 'primeng/slider';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SplitterModule} from 'primeng/splitter';
import {StepsModule} from 'primeng/steps';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TagModule} from 'primeng/tag';
import {TerminalModule} from 'primeng/terminal';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TimelineModule} from 'primeng/timeline';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {FullCalendarModule} from '@fullcalendar/angular';

// Application Components
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { AppBreadcrumbComponent } from './_primeng/app.breadcrumb.component';
import { AppConfigComponent } from './_primeng/app.config.component';
import { AppFooterComponent } from './_primeng/app.footer.component';
import { AppMainComponent } from './_primeng/app.main.component';
import { AppMenuComponent } from './_primeng/app.menu.component';
import { MenuService } from './_primeng/app.menu.service';
import { AppMenuitemComponent } from './_primeng/app.menuitem.component';
import { AppRightPanelComponent } from './_primeng/app.rightpanel.component';
import { AppTopBarComponent } from './_primeng/app.topbar.component';
import { AppCodeModule } from './_primeng/blocks/app-code/app.code.component';
import { BlocksComponent } from './_primeng/blocks/blocks/blocks.component';
import { BlockViewer } from './_primeng/blocks/blockviewer/blockviewer.component';
import { BreadcrumbService } from './_primeng/breadcrumb.service';
import { ConfigService } from './_primeng/demo/service/app.config.service';
import { CountryService } from './_primeng/demo/service/countryservice';
import { CustomerService } from './_primeng/demo/service/customerservice';
import { EventService } from './_primeng/demo/service/eventservice';
import { IconService } from './_primeng/demo/service/iconservice';
import { NodeService } from './_primeng/demo/service/nodeservice';
import { PhotoService } from './_primeng/demo/service/photoservice';
import { ProductService } from './_primeng/demo/service/productservice';
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
import { MenusComponent } from './_primeng/demo/view/menus/menus.component';
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
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        AppCodeModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarModule,
        AvatarGroupModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        FullCalendarModule,
        ImageModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        TerminalModule,
        TimelineModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        ReactiveFormsModule,

    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppRightPanelComponent,
        AppConfigComponent,
        AppBreadcrumbComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        AppLoginComponent,
        AppCrudComponent,
        AppCalendarComponent,
        AppTimelineDemoComponent,
        DashboardDemoComponent,
        FormLayoutDemoComponent,
        FloatLabelDemoComponent,
        InvalidStateDemoComponent,
        InputDemoComponent,
        ButtonDemoComponent,
        TableDemoComponent,
        ListDemoComponent,
        TreeDemoComponent,
        PanelsDemoComponent,
        OverlaysDemoComponent,
        MediaDemoComponent,
        MenusComponent,
        MessagesDemoComponent,
        MessagesDemoComponent,
        MiscDemoComponent,
        ChartsDemoComponent,
        EmptyDemoComponent,
        FileDemoComponent,
        DocumentationComponent,
        IconsComponent,
        BlocksComponent,
        BlockViewer,
        CompanyComponent,
        AgencyComponent,
        BookingComponent,
        BusComponent,
        CancellationComponent,
        CashRegisterComponent,
        CustomerComponent,
        ExpenseComponent,
        PermissionComponent,
        RoleComponent,
        RouteComponent,
        ScheduleComponent,
        StaffComponent,
        StopoverComponent,
        TerminalComponent,
        UserComponent,
        AccountComponent,
        TransactionComponent,
        CashTransactionComponent,
        InventoryComponent,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MenuService, BreadcrumbService, ConfigService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
