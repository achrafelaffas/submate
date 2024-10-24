import { PaymentResponse } from "@/api";
import DataTable from "@/components/DataTable";
import { columns } from "./Columns";

const PaymentHistory = ({ payments }: { payments: PaymentResponse[] }) => {
  return <DataTable columns={columns} data={payments} isloading={false} />;
};

export default PaymentHistory;
