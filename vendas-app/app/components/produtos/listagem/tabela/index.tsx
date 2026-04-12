import { Produto } from "@/app/models/produtos";
import { formatReal } from "@/app/util/money";

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
  return (
    <tr>
      <td>{produto.id}</td>
      <td>{produto.sku}</td>
      <td>{produto.nome}</td>
      <td>{formatReal(produto.preco)}</td>
      <td>
        <div className="buttons">
          <button
            className="button is-info is-rounded is-small"
            onClick={(e) => onEdit(produto)}
          >
            Editar
          </button>
          <button
            className="button is-danger is-rounded is-small"
            onClick={(e) => onDelete(produto)}
          >
            Excluir
          </button>
        </div>
      </td>
    </tr>
  );
};
