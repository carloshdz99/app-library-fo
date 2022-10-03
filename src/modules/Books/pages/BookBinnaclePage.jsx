import { DashboardLayout } from "../../layout/dashboardLayout";
import { BookBinnacle } from "../views/";

export const BookBinnaclePage = () => {
    return (
        <DashboardLayout>
            <BookBinnacle title="Historial de solicitudes" />
        </DashboardLayout>
    );
}