import React from "react";
import AdminComponents from "./AdminComponents";

/**
 * @author Aki Helin
 * @version 1.0
 *
 * Admin page view, calls AdminComponents and everything will be displayed to the admin.
 * @returns html elements.
 */
function AdminPage() {
  return (
    <div>
      <p>Insert a new word pair, edit or delete the current ones.</p>
      <AdminComponents />
    </div>
  );
}

export default AdminPage;
