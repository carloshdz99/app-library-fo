import { DashboardLayout } from "../../layout/dashboardLayout";
import { BookListView } from "../views/";

export const BookListPage = () => {
    return (
        <DashboardLayout>
            <BookListView title="Libros" />
        </DashboardLayout>
    );
}
