import  { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format, isWithinInterval } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const SalesReport = () => {
    const axiosSecure = useAxiosSecure();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const { data: sales = [] } = useQuery({
        queryKey: ['sales'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin-sales`);
            return res.data;
        }
    });

    const filteredSales = sales.filter(sale => {
        if (startDate && endDate) {
            return isWithinInterval(new Date(sale.date), { start: startDate, end: endDate });
        }
        return true;
    });

    const exportPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['#', 'Medicine Name', 'Seller Name', 'Seller Email', 'Buyer Email', 'Date']],
            body: filteredSales.flatMap((sale, index) =>
                sale.medicineName.map((medicine, idx) => [
                    index + 1,
                    medicine,
                    sale.sellerName[idx],
                    sale.sellerEmail[idx],
                    sale.email,
                    format(new Date(sale.date), 'yyyy-MM-dd HH:mm:ss')
                ])
            ),
        });
        doc.save('sales_report.pdf');
    };

    const exportCSV = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredSales.flatMap((sale, index) =>
            sale.medicineName.map((medicine, idx) => ({
                '#': index + 1,
                'Medicine Name': medicine,
                'Seller Name': sale.sellerName[idx],
                'Seller Email': sale.sellerEmail[idx],
                'Buyer Email': sale.email,
                'Date': format(new Date(sale.date), 'yyyy-MM-dd HH:mm:ss')
            }))
        ));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Report');
        XLSX.writeFile(workbook, 'sales_report.xlsx');
    };

    const exportDOCX = () => {
        const content = filteredSales.flatMap((sale, index) =>
            sale.medicineName.map((medicine, idx) => [
                index + 1,
                medicine,
                sale.sellerName[idx],
                sale.sellerEmail[idx],
                sale.email,
                format(new Date(sale.date), 'yyyy-MM-dd HH:mm:ss')
            ])
        ).map(row => row.join('\t')).join('\n');
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'sales_report.docx');
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Sales Report</h1>
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex space-x-2">
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Start Date"
                        className="border border-gray-300 rounded p-2 text-xl font-bold"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="End Date"
                        className="border border-gray-300 rounded p-2 text-xl font-bold"
                    />
                </div>
                <div className="flex space-x-2">
                    <button onClick={exportPDF} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-xl font-bold">Export PDF</button>
                    <button onClick={exportCSV} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-xl font-bold">Export CSV/XLSX</button>
                    <button onClick={exportDOCX} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded text-xl font-bold">Export DOCX</button>
                </div>
            </div>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xl font-bold">#</th>
                            <th className="px-6 py-3 text-left text-xl font-bold">Medicine Name</th>
                            <th className="px-6 py-3 text-left text-xl font-bold">Seller Name</th>
                            <th className="px-6 py-3 text-left text-xl font-bold">Seller Email</th>
                            <th className="px-6 py-3 text-left text-xl font-bold">Buyer Email</th>
                            <th className="px-6 py-3 text-left text-xl font-bold">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSales.map((sale, index) => {
                            return sale.medicineName.map((medicine, idx) => (
                                <tr key={`${sale._id}-${idx}`} className="border-b border-gray-200 hover:bg-gray-100">
                                    <th className="px-6 py-4 text-xl font-bold text-blue-800">{index + 1}</th>
                                    <td className="px-6 py-4 text-xl font-bold text-blue-500">{medicine}</td>
                                    <td className="px-6 py-4 text-xl font-bold text-green-700">{sale.sellerName[idx]}</td>
                                    <td className="px-6 py-4 text-xl font-bold text-red-700">{sale.sellerEmail[idx]}</td>
                                    <td className="px-6 py-4 text-xl font-bold text-brown-600">{sale.email}</td>
                                    <td className="px-6 py-4 text-xl font-bold text-gray-800">{format(new Date(sale.date), 'yyyy-MM-dd HH:mm:ss')}</td>
                                </tr>
                            ));
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesReport;
