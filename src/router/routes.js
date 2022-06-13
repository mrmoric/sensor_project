import Inventory from '../pages/Inventory/Inventory';
import MakeSale from '../pages/MakeSale/MakeSale';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import Dashboard from '../pages/Dashboard/Dashboard';
import Distributor from '../pages/Distributor';
import Product from '../pages/Product/Product';
import ProductList from '../pages/ProductList';
import Option from '../pages/Option';
import OptionList from '../pages/OptionList';
import DistributorList from '../pages/DistributorList';
import AddShipment from '../pages/AddShipment/AddShipment';


const adminRoutes = [
    { path: '/dashboard/options/edit/:OptionId', element: Option, exact: true },
    { path: '/dashboard/options/add', element: Option, elementProps: { add: true }, exact: true },
    { path: '/dashboard/options', element: OptionList, exact: true },
    { path: '/dashboard/add-shipment', element: AddShipment, exact: true },
    { path: '/dashboard/products/edit/:ProductId', element: Product, exact: true },
    { path: '/dashboard/products/add', element: Product, elementProps: { add: true }, exact: true },
    { path: '/dashboard/products', element: ProductList, exact: true },
    { path: '/dashboard/distributors/edit/:CompanyId', element: Distributor, exact: true },
    { path: '/dashboard/distributors/add', element: Distributor, elementProps: { add: true }, exact: true },
    { path: '/dashboard/distributors', element: DistributorList, exact: true },
    { path: '/dashboard/inventory/sold/:CompanyId', element: Inventory, elementProps: { sold: true }, exact: true },
    { path: '/dashboard/inventory/:CompanyId', element: Inventory, exact: true },
    { path: '/dashboard/distributor', element: Dashboard, exact: true },
    { path: '/dashboard', element: AdminDashboard, exact: true },
]


const distributorRoutes = [
    { path: '/dashboard/make-sale/:MacOrSerial', element: MakeSale, exact: true },
    { path: '/dashboard/make-sale/', element: MakeSale, exact: true },
    { path: '/dashboard/inventory/sold', element: Inventory, elementProps: { sold: true }, exact: true },
    { path: '/dashboard/inventory', element: Inventory, exact: true },
    { path: '/dashboard', element: Dashboard, exact: true },
]

export {
    adminRoutes,
    distributorRoutes
}