package lk.ijse.cmjd.researchtracker.document.service;

import lk.ijse.cmjd.researchtracker.document.dto.DocumentRequestDTO;
import lk.ijse.cmjd.researchtracker.document.dto.DocumentResponseDTO;
import lk.ijse.cmjd.researchtracker.document.entity.Document;
import lk.ijse.cmjd.researchtracker.document.repository.DocumentRepository;
import lk.ijse.cmjd.researchtracker.project.entity.Project;
import lk.ijse.cmjd.researchtracker.project.repository.ProjectRepository;
import lk.ijse.cmjd.researchtracker.user.dto.UserDTO;
import lk.ijse.cmjd.researchtracker.user.entity.User;
import lk.ijse.cmjd.researchtracker.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentService {
    
    private final DocumentRepository documentRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    
    public List<DocumentResponseDTO> getDocumentsByProjectId(String projectId) {
        return documentRepository.findByProjectId(projectId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public DocumentResponseDTO createDocument(String projectId, DocumentRequestDTO requestDTO) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        User uploadedBy = userRepository.findById(requestDTO.getUploadedById())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Document document = new Document();
        document.setProject(project);
        document.setTitle(requestDTO.getTitle());
        document.setDescription(requestDTO.getDescription());
        document.setUrlOrPath(requestDTO.getUrlOrPath());
        document.setUploadedBy(uploadedBy);
        
        Document savedDocument = documentRepository.save(document);
        return convertToDTO(savedDocument);
    }
    
    @Transactional
    public void deleteDocument(String id) {
        if (!documentRepository.existsById(id)) {
            throw new RuntimeException("Document not found");
        }
        documentRepository.deleteById(id);
    }
    
    private DocumentResponseDTO convertToDTO(Document document) {
        UserDTO uploadedByDTO = new UserDTO(
                document.getUploadedBy().getId(),
                document.getUploadedBy().getUsername(),
                document.getUploadedBy().getFullName(),
                document.getUploadedBy().getRole(),
                document.getUploadedBy().getCreatedAt()
        );
        
        return new DocumentResponseDTO(
                document.getId(),
                document.getProject().getId(),
                document.getTitle(),
                document.getDescription(),
                document.getUrlOrPath(),
                uploadedByDTO,
                document.getUploadedAt()
        );
    }
}
