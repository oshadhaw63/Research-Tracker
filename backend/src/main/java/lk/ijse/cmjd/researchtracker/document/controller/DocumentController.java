package lk.ijse.cmjd.researchtracker.document.controller;

import jakarta.validation.Valid;
import lk.ijse.cmjd.researchtracker.common.dto.ResponseDTO;
import lk.ijse.cmjd.researchtracker.document.dto.DocumentRequestDTO;
import lk.ijse.cmjd.researchtracker.document.dto.DocumentResponseDTO;
import lk.ijse.cmjd.researchtracker.document.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DocumentController {
    
    private final DocumentService documentService;
    
    @GetMapping("/projects/{id}/documents")
    public ResponseEntity<ResponseDTO<List<DocumentResponseDTO>>> getDocumentsByProjectId(@PathVariable String id) {
        try {
            List<DocumentResponseDTO> documents = documentService.getDocumentsByProjectId(id);
            return ResponseEntity.ok(ResponseDTO.success("Documents retrieved successfully", documents));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
    
    @PostMapping("/projects/{id}/documents")
    @PreAuthorize("hasAnyRole('MEMBER', 'PI', 'ADMIN')")
    public ResponseEntity<ResponseDTO<DocumentResponseDTO>> createDocument(
            @PathVariable String id,
            @Valid @RequestBody DocumentRequestDTO request
    ) {
        try {
            DocumentResponseDTO document = documentService.createDocument(id, request);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(ResponseDTO.success("Document uploaded successfully", document));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
    
    @DeleteMapping("/documents/{id}")
    @PreAuthorize("hasAnyRole('PI', 'ADMIN')")
    public ResponseEntity<ResponseDTO<Void>> deleteDocument(@PathVariable String id) {
        try {
            documentService.deleteDocument(id);
            return ResponseEntity.ok(ResponseDTO.success("Document deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
}

