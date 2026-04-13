import { Produto } from "@/app/models/produtos";
import { formatReal } from "@/app/util/money";
import { useState } from "react";

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
  return (
    <table className="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>Código</th>
          <th>SKU</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos?.map((produto) => (
          <ProdutoRow
            onEdit={onEdit}
            onDelete={onDelete}
            key={produto.id}
            produto={produto}
          />
        ))}
      </tbody>
    </table>
  );
};

const ProdutoRow: React.FC<ProdutoRowProps> = ({
  produto,
  onDelete,
  onEdit,
}) => {
  const [deletando, setDeletando] = useState<boolean>(false);

  const onDeleteClick = (produto: Produto) => {
    if (deletando) {
      onDelete(produto);
      setDeletando(false);
    } else {
      setDeletando(true);
    }
  };

  const cancelaDelete = () => setDeletando(false);

  return (
    <tr>
      <td>{produto.id}</td>
      <td>{produto.sku}</td>
      <td>{produto.nome}</td>
      <td>{formatReal(produto.preco)}</td>
      <td>
        {!deletando && (
          <button
            onClick={(e) => onEdit(produto)}
            className="button is-success is-rounded is-small"
          >
            Editar
          </button>
        )}

        <button
          onClick={(e) => onDeleteClick(produto)}
          className="button is-danger is-rounded  is-small"
        >
          {deletando ? "Confirma?" : "Deletar"}
        </button>

        {deletando && (
          <button
            onClick={cancelaDelete}
            className="button is-rounded is-small"
          >
            Cancelar
          </button>
        )}
      </td>
    </tr>
  );
};
