package io.github.brayansistemas26.vendasapiback.rest.produtos;

import io.github.brayansistemas26.vendasapiback.model.Cliente;
import io.github.brayansistemas26.vendasapiback.model.repository.ClienteRepository;
import org.apache.coyote.Response;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public ResponseEntity<Void> editar(@PathVariable Long id, @RequestBody ClienteFormRequest cliente){
        Optional<Cliente> clienteEncontrado = clienteRepository.findById(id);

        if (clienteEncontrado.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        modelMapper.map(cliente, clienteEncontrado);
        clienteEncontrado.get().setId(id);
        clienteRepository.save(clienteEncontrado.get());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteFormRequest> getById(@PathVariable Long id){
        return clienteRepository.findById(id)
                .map(cliente -> {
                    ClienteFormRequest dto = modelMapper.map(cliente, ClienteFormRequest.class);
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<ClienteFormRequest> getLista() {
        return clienteRepository.findAll().stream().map(cliente -> modelMapper.map(cliente, ClienteFormRequest.class))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return clienteRepository.findById(id).map(cliente -> {
            clienteRepository.delete(cliente);
            return ResponseEntity.noContent().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }



}
