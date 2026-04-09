package io.github.brayansistemas26.vendasapiback.rest.produtos;

import io.github.brayansistemas26.vendasapiback.model.Produto;
import io.github.brayansistemas26.vendasapiback.model.repository.ProdutoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ModelMapper modelMapper;


    @PostMapping
    public ProdutoFormRequest salvar(@RequestBody ProdutoFormRequest produto){
        Produto produtoSalvo = modelMapper.map(produto, Produto.class);
        produtoSalvo = produtoRepository.save(produtoSalvo);
        return modelMapper.map(produtoSalvo, ProdutoFormRequest.class);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody ProdutoFormRequest produto){
        Produto entidadeEncontrada = produtoRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND));
        modelMapper.map(produto, entidadeEncontrada);
        entidadeEncontrada.setId(id);
        produtoRepository.save(entidadeEncontrada);

        return ResponseEntity.ok().build();

    }

}
