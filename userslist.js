var dataTable;

function loadDataTable(filters = {}) {
  dataTable = $("#tblData").DataTable({
    ajax: {
      url: "/Admin/User/UsersListData",
      data: filters,
    },
    columns: [
      {
        data: null,
        render: function (data, type, row, meta) {
          return parseInt(meta.row, 10) + 1;
        },
        width: "2%",
        className: "dt-center",
      },
      {
        data: "name",
        width: "15%",
        render: function (data, type, row) {
          var isBaseAcnt = row.isBaseAccount;
          if (isBaseAcnt) {
            return "<b>" + data + "</b>";
          }
          return data;
        },
      },
      { data: "phoneNumber", width: "15%" },
      {
        data: "email",
        width: "15%",
        render: function (data) {
          return data ? data : "Not Available";
        },
      },
      {
        data: "city",
        width: "15%",
        render: function (data) {
          return data ? data : "Not Available";
        },
      },

      {
        data: "companyName",
        width: "15%",
        render: function (data) {
          return data ? data : "Not Available";
        },
      },

      {
        data: "profile",
        width: "15%",
        render: function (data) {
          return data ? data : "Not Available";
        },
      },

      {
        data: "accountStatus",
        width: "15%",
        render: function (data) {
          return data ? data : "Not Available";
        },
      },

      {
        data: "isMaster",
        width: "15%",
        render: function (data) {
          if (data === true) {
            return "Yes";
          } else if (data === false) {
            return "No";
          } else {
            return "Not Available";
          }
        },
      },

      {
        data: "id",
        render: function (data, type, row) {
          var hideBaseAccount = !row.isBaseAccount;
          var isSuperAdmin = row.isSuperAdmin;
          var isAdminRoles = row.isAdminRoles;

          return `
            <div class="dropdown dropleft">
                <a style="font-size: 20px;" data-toggle="dropdown" href="javascript:void(0)" aria-haspopup="true" aria-expanded="false">
                    <i class="ion ion-ios-settings-strong"></i>
                </a>
                <div class="dropdown-menu dropleft" style="width: 30px;">
                    <a class="dropdown-item has-icon" href="/Admin/User/UpdateUserProfile/?id=${data}" onclick="fetchForm(event)">
                        <i class="ion ion-edit"></i> Edit
                    </a>
                    <a class="dropdown-item has-icon" href="/Admin/User/Detail/${data}" onclick="fetchForm(event)">
                        <i class="ion ion-information-circled"></i> Detail
                    </a>
                    <a class="dropdown-item has-icon" href="/Admin/User/AssignBaseAccount/?id=${data}" onclick="fetchForm(event)">
                        <i class="ion ion-ios-home"></i> Base Account
                    </a>
                    ${
                      hideBaseAccount
                        ? ""
                        : `
                    ${
                      isAdminRoles
                        ? ""
                        : ` 
                        <a class="dropdown-item has-icon" href="/Admin/User/AssignCompany/?id=${data}" onclick="fetchForm(event)">
                            <i class="ion ion-android-contacts"></i> Company
                        </a>
                         `
                    }
                        ${
                          isSuperAdmin
                            ? ""
                            : `
                        <a class="dropdown-item has-icon" href="/Admin/User/AssignRole/?id=${data}" onclick="fetchForm(event)">
                            <i class="ion ion-ios-people"></i> Assign Role
                        </a>
                        `
                        }
                    `
                    }
                </div>
            </div>
        `;
        },
        width: "15%",
      },
    ],

    createdRow: function (row, data, dataIndex) {
      $(row).attr("id", `row-${data.id}`);
    },
  });
}
