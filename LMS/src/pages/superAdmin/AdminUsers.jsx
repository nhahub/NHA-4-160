import { useState } from "react";
import { FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useUsersPaginated, useManageUsers } from "../../hooks/useSuperAdmin";

const AdminUsers = () => {
  const [page, setPage] = useState(1);
  const limit = 8;
  const { data, isLoading } = useUsersPaginated(page, limit);
  const { deleteMutation } = useManageUsers();

  const users = data?.data || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / limit);

  if (isLoading)
    return (
      <div style={{ color: "var(--color-grey-700)" }}>Loading users...</div>
    );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0" style={{ color: "var(--color-grey-900)" }}>
          Platform Users
        </h2>
      </div>

      <div
        className="rounded-3 overflow-hidden"
        style={{
          backgroundColor: "var(--color-grey-0)",
          border: "1px solid var(--color-grey-200)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <table className="table m-0 align-middle">
          <thead>
            <tr style={{ backgroundColor: "var(--color-grey-50)" }}>
              <th
                className="p-3 border-0"
                style={{
                  color: "var(--color-grey-600)",
                  backgroundColor: "var(--color-grey-50)",
                }}
              >
                Name
              </th>
              <th
                className="p-3 border-0"
                style={{
                  color: "var(--color-grey-600)",
                  backgroundColor: "var(--color-grey-50)",
                }}
              >
                Email
              </th>
              <th
                className="p-3 border-0"
                style={{
                  color: "var(--color-grey-600)",
                  backgroundColor: "var(--color-grey-50)",
                }}
              >
                Role
              </th>
              <th
                className="p-3 border-0"
                style={{
                  color: "var(--color-grey-600)",
                  backgroundColor: "var(--color-grey-50)",
                }}
              >
                Academy
              </th>
              <th
                className="p-3 border-0"
                style={{
                  color: "var(--color-grey-600)",
                  backgroundColor: "var(--color-grey-50)",
                }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                style={{
                  borderTop: "1px solid var(--color-grey-200)",
                  backgroundColor: "var(--color-grey-0)",
                }}
              >
                <td
                  className="p-3 border-0 fw-semibold"
                  style={{
                    color: "var(--color-grey-900)",
                    backgroundColor: "var(--color-grey-0)",
                  }}
                >
                  {user.name}
                </td>
                <td
                  className="p-3 border-0"
                  style={{
                    color: "var(--color-grey-700)",
                    backgroundColor: "var(--color-grey-0)",
                  }}
                >
                  {user.email}
                </td>
                <td
                  className="p-3 border-0"
                  style={{ backgroundColor: "var(--color-grey-0)" }}
                >
                  <span
                    className="badge rounded-pill"
                    style={{
                      backgroundColor:
                        user.role === "admin"
                          ? "var(--color-brand-50)"
                          : "var(--color-grey-100)",
                      color:
                        user.role === "admin"
                          ? "var(--color-brand-700)"
                          : "var(--color-grey-700)",
                      textTransform: "capitalize",
                    }}
                  >
                    {user.role}
                  </span>
                </td>
                <td
                  className="p-3 border-0"
                  style={{
                    color: "var(--color-grey-700)",
                    backgroundColor: "var(--color-grey-0)",
                  }}
                >
                  {user.tenants?.academy_name || "N/A"}
                </td>
                <td
                  className="p-3 text-end border-0"
                  style={{ backgroundColor: "var(--color-grey-0)" }}
                >
                  <button
                    onClick={() => deleteMutation.mutate(user.id)}
                    className="btn btn-sm"
                    style={{
                      border: "1px solid var(--color-grey-300)",
                      color: "#dc2626",
                    }}
                    disabled={deleteMutation.isPending}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn btn-sm d-flex align-items-center gap-2"
            style={{
              backgroundColor: "var(--color-grey-0)",
              border: "1px solid var(--color-grey-300)",
              color: "var(--color-grey-700)",
            }}
          >
            <FaChevronLeft /> Prev
          </button>
          <span
            className="small fw-semibold"
            style={{ color: "var(--color-grey-600)" }}
          >
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn btn-sm d-flex align-items-center gap-2"
            style={{
              backgroundColor: "var(--color-grey-0)",
              border: "1px solid var(--color-grey-300)",
              color: "var(--color-grey-700)",
            }}
          >
            Next <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
