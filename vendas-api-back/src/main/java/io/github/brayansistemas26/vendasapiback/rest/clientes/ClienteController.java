package io.github.brayansistemas26.vendasapiback.rest.clientes;

import io.github.brayansistemas26.vendasapiback.model.Cliente;
import io.github.brayansistemas26.vendasapiback.model.repository.ClienteRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<ClienteFormRequest> salvar(@RequestBody ClienteFormRequest cliente){
        Cliente clienteParaSalvar = modelMapper.map(cliente, Cliente.class);
        clienteParaSalvar = clienteRepository.save(clienteParaSalvar);
        return ResponseEntity.ok(modelMapper.map(clienteParaSalvar, ClienteFormRequest.class)) ;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> editar(@PathVariable Long id, @RequestBody ClienteFormRequest clienteRequest) {
        return clienteRepository.findById(id).map(clienteExistente -> {
            modelMapper.map(clienteRequest, clienteExistente);
            clienteExistente.setId(id);
            clienteRepository.save(clienteExistente);

            return ResponseEntity.ok().<Void>build();

        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteFormRequest> getById(@PathVariable Long id){
        return clienteRepository.findById(id)
                .map(cliente -> ResponseEntity.ok(modelMapper.map(cliente, ClienteFormRequest.class)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public Page<ClienteFormRequest> getLista(@RequestParam(required = false, defaultValue = "") String nome, @RequestParam(required = false,
    defaultValue = "") String cpf, Pageable pageable) {
        return clienteRepository.buscarPorNomeCpf("%" + nome + "%", "%" + cpf + "%", pageable).map(cliente ->
                modelMapper.map(cliente, ClienteFormRequest.class));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return clienteRepository.findById(id).map(cliente -> {
            clienteRepository.delete(cliente);
            return ResponseEntity.noContent().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }



}
