import {AdminHeader} from "@/core/components/layout/AdminHeader";
import {AdminNavBar} from "@/core/components/layout/AdminNavBar";
import {Outlet} from "react-router-dom";
import { useDocumentTitle } from "@/core/hooks/utils/useDocumentTitle";

export const AdminLayout = () => {
    useDocumentTitle("Admin Panel")

    return (
        <div className="min-h-screen bg-background overflow-hidden" dir="ltr">
            <AdminNavBar />
            <AdminHeader />
            <main className="ml-[260px] mt-24 h-[calc(100vh-96px)] overflow-hidden">
                <div className="container mx-auto h-full overflow-y-auto scrollbar-hide">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
