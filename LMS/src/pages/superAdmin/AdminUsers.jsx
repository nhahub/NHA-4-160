import { useState } from "react";
import { FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Placeholder } from "react-bootstrap";
import { useUsersPaginated, useManageUsers } from "../../hooks/useSuperAdmin";

const AdminUsers = () => {
  const [page, setPage] = useState(1);
  const limit = 8;
  const { data, isLoading } = useUsersPaginated(page, limit);
  const { deleteMutation } = useManageUsers();

  const users = data?.data || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / limit);

  if (isLoading) {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Placeholder as="h2" animation="glow" className="m-0 w-25">
            <Placeholder
              xs={12}
              className="rounded-3"
              style={{
                height: "32px",
                backgroundColor: "var(--color-grey-300)",
              }}
            />
          </Placeholder>
        </div>
        <div
          className="rounded-3 overflow-hidden"
          style={{
            backgroundColor: "var(--color-grey-0)",
            border: "1px solid var(--color-grey-200)",
          }}
        >
          <table className="table m-0 align-middle">
            <thead>
              <tr style={{ backgroundColor: "var(--color-grey-50)" }}>
                {["Name", "Email", "Role", "Academy", ""].map((th, i) => (
                  <th
                    key={i}
                    className="p-3 border-0"
                    style={{ color: "var(--color-grey-600)" }}
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
                <tr
                  key={row}
                  style={{
                    borderTop: "1px solid var(--color-grey-200)",
                    backgroundColor: "var(--color-grey-0)",
                  }}
                >
                  {[1, 2, 3, 4].map((col) => (
                    <td key={col} className="p-3 border-0">
                      <Placeholder animation="glow">
                        <Placeholder
                          xs={8}
                          className="rounded-2"
                          style={{ backgroundColor: "var(--color-grey-200)" }}
                        />
                      </Placeholder>
                    </td>
                  ))}
                  <td className="p-3 text-end border-0">
                    <Placeholder animation="glow">
                      <Placeholder.Button
                        xs={6}
                        className="border-0"
                        style={{ backgroundColor: "var(--color-grey-200)" }}
                      />
                    </Placeholder>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

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
