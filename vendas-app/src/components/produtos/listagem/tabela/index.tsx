import { Produto } from "@/src/app/models/produtos";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useRouter, useParams } from "next/navigation";

interface TabelaProdutosProps {
  produtos: Array<Produto>;
  onEdit: (produto: any) => void;
  onDelete: (produto: any) => void;
}

interface ProdutoRowProps {
  produto: Produto;
  onEdit: (produto: any) => void;
  onDelete: (produto: any) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
  produtos,
  onEdit,
  onDelete,
}) => {

  const router = useRouter();

  const actionTemplate = (registro: Produto) => {
    const url = `/cadastros/produtos/${registro.id}`
    return (
      <div className="!flex !gap-4"> {/* Tailwind para espaçamento */}
        <Button
          icon="pi pi-pencil" // Ícones do PrimeIcons que você já importou
          rounded
          severity="info"
          tooltip="Editar" onClick={e => router.push(url)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          tooltip="Deletar" onClick={e => {
            confirmDialog({
              message: "Confirma a exclusão deste registro?",
              acceptLabel: "Sim", rejectLabel: "Não", accept: () => onDelete(registro),
              header: "Confirmação"
            })
          }}
        />
      </div>
    )
  }

  return (

    <div>
      <ConfirmDialog />
      <DataTable value={produtos} paginator rows={5}>
        <Column header="Código" field="id" />
        <Column header="SKU" field="sku" />
        <Column header="Nome" field="nome" />
        <Column header="Preço" field="preco" />
        <Column body={actionTemplate} />
      </DataTable>
    </div>

  );
};

