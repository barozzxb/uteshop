// import { useEffect, useState } from "react";
// import { getDashboardStats } from "@/services/dashboard.service";

// interface TopProduct {
//     productsku: string;
//     sold: number;
//     views: number;
// }

// interface Customer {
//     firstName: string;
//     lastName: string;
//     email: string;
// }

// export default function Dashboard() {
//     const [revenue, setRevenue] = useState(0);
//     const [deliveredOrders, setDeliveredOrders] = useState(0);
//     const [shippingOrders, setShippingOrders] = useState(0);
//     const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
//     const [newCustomers, setNewCustomers] = useState<Customer[]>([]);

//     useEffect(() => {
//         getDashboardStats().then((res: any) => {
//             const data = res.data.data;
//             setRevenue(data.revenue);
//             setDeliveredOrders(data.deliveredOrders);
//             setShippingOrders(data.shippingOrders);
//             setTopProducts(data.topProducts);
//             setNewCustomers(data.newCustomers);
//         });
//     }, []);

//     return (
//         <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//             <h1 className="text-3xl font-bold text-indigo-600">Admin Dashboard</h1>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition">
//                     <p className="text-gray-500 font-medium">Doanh thu</p>
//                     <p className="text-2xl font-bold mt-2">{revenue.toLocaleString()} VNĐ</p>
//                 </div>
//                 <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition">
//                     <p className="text-gray-500 font-medium">Đơn đã giao</p>
//                     <p className="text-2xl font-bold mt-2">{deliveredOrders}</p>
//                 </div>
//                 <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition">
//                     <p className="text-gray-500 font-medium">Đơn đang giao</p>
//                     <p className="text-2xl font-bold mt-2">{shippingOrders}</p>
//                 </div>
//                 <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition">
//                     <p className="text-gray-500 font-medium">Khách hàng mới</p>
//                     <ul className="mt-2 text-gray-700 space-y-1 max-h-32 overflow-y-auto">
//                         {newCustomers.map((c, idx) => (
//                             <li key={idx}>
//                                 {c.firstName} {c.lastName}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>

//             <div className="mt-8 bg-white rounded-xl shadow-lg p-5">
//                 <h2 className="text-xl font-bold text-gray-800 mb-4">
//                     Top 10 sản phẩm bán chạy
//                 </h2>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">SKU</th>
//                                 <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Sold</th>
//                                 <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Views</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-100">
//                             {topProducts.map((p, idx) => (
//                                 <tr
//                                     key={idx}
//                                     className="hover:bg-gray-50 transition text-gray-800 text-sm text-center"
//                                 >
//                                     <td className="px-4 py-2 text-left">{p.productsku}</td>
//                                     <td className="px-4 py-2 text-right">{p.sold}</td>
//                                     <td className="px-4 py-2 text-right">{p.views}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import ProductModal from "@/pages/admin/components/ProductModal";
import GenreModal from "@/pages/admin/components/GenreModal";
import { getDashboardStats } from "@/services/dashboard.service";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface TopProduct {
    productsku: string;
    sold: number;
    views: number;
}

interface Customer {
    firstName: string;
    lastName: string;
    email: string;
    gender?: "Male" | "Female";
}

export default function Dashboard() {
    const [revenue, setRevenue] = useState(0);
    const [deliveredOrders, setDeliveredOrders] = useState(0);
    const [shippingOrders, setShippingOrders] = useState(0);
    const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
    const [newCustomers, setNewCustomers] = useState<Customer[]>([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>([]);
    const [genderStats, setGenderStats] = useState<{ Male: number; Female: number }>({ Male: 0, Female: 0 });

    const [openProductModal, setOpenProductModal] = useState(false);
    const [openGenreModal, setOpenGenreModal] = useState(false);

    useEffect(() => {
        getDashboardStats().then((res: any) => {
            const data = res.data.data;
            setRevenue(data.revenue);
            setDeliveredOrders(data.deliveredOrders);
            setShippingOrders(data.shippingOrders);
            setTopProducts(data.topProducts);
            setNewCustomers(data.newCustomers);
            setMonthlyRevenue(data.monthlyRevenue || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

            const genders = { Male: 0, Female: 0 };
            (data.newCustomers || []).forEach((c: Customer) => {
                if (c.gender === "Male") genders.Male += 1;
                if (c.gender === "Female") genders.Female += 1;
            });
            setGenderStats(genders);
        });
    }, []);

    const revenueChartData = {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        datasets: [
            {
                label: "Revenue (VNĐ)",
                data: monthlyRevenue,
                backgroundColor: "rgba(99, 102, 241, 0.7)"
            }
        ]
    };

    const genderChartData = {
        labels: ["Male", "Female"],
        datasets: [
            {
                data: [genderStats.Male, genderStats.Female],
                backgroundColor: ["#3B82F6", "#EC4899"]
            }
        ]
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-indigo-600">Admin Dashboard</h1>

            <div className="flex flex-wrap gap-3 mb-6">
                <button
                    onClick={() => setOpenProductModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition"
                >
                    + Add Product
                </button>
                <button
                    onClick={() => setOpenGenreModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
                >
                    + Add Genre
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition">
                    <p className="text-gray-500 font-medium">Doanh thu</p>
                    <p className="text-2xl font-bold mt-2">{revenue.toLocaleString()} VNĐ</p>
                </div>
                <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition">
                    <p className="text-gray-500 font-medium">Đơn đã giao</p>
                    <p className="text-2xl font-bold mt-2">{deliveredOrders}</p>
                </div>
                <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition">
                    <p className="text-gray-500 font-medium">Đơn đang giao</p>
                    <p className="text-2xl font-bold mt-2">{shippingOrders}</p>
                </div>
                <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition">
                    <p className="text-gray-500 font-medium">Khách hàng mới</p>
                    <ul className="mt-2 text-gray-700 space-y-1 max-h-32 overflow-y-auto">
                        {newCustomers.map((c, idx) => (
                            <li key={idx}>{c.firstName} {c.lastName}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-5">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Revenue</h2>
                    <Bar data={revenueChartData} />
                </div>

            </div>

            <div className="mt-8 bg-white rounded-xl shadow-lg p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Top 10 sản phẩm bán chạy
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">SKU</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sold</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Views</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {topProducts.map((p, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition text-gray-800 text-sm">
                                    <td className="px-4 py-2">{p.productsku}</td>
                                    <td className="px-4 py-2">{p.sold}</td>
                                    <td className="px-4 py-2">{p.views}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ProductModal
                open={openProductModal}
                onClose={() => setOpenProductModal(false)}
                onSubmit={() => { }}
            />
            <GenreModal
                open={openGenreModal}
                onClose={() => setOpenGenreModal(false)}
                onSubmit={() => { }}
            />
        </div>
    );
}
