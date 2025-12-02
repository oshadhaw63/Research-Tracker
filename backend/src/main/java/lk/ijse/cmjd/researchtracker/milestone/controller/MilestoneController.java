package lk.ijse.cmjd.researchtracker.milestone.controller;

import jakarta.validation.Valid;
import lk.ijse.cmjd.researchtracker.common.dto.ResponseDTO;
import lk.ijse.cmjd.researchtracker.milestone.dto.MilestoneRequestDTO;
import lk.ijse.cmjd.researchtracker.milestone.dto.MilestoneResponseDTO;
import lk.ijse.cmjd.researchtracker.milestone.service.MilestoneService;
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
public class MilestoneController {
    
    private final MilestoneService milestoneService;
    
    @GetMapping("/projects/{id}/milestones")
    public ResponseEntity<ResponseDTO<List<MilestoneResponseDTO>>> getMilestonesByProjectId(@PathVariable String id) {
        try {
            List<MilestoneResponseDTO> milestones = milestoneService.getMilestonesByProjectId(id);
            return ResponseEntity.ok(ResponseDTO.success("Milestones retrieved successfully", milestones));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
    
    @PostMapping("/projects/{id}/milestones")
    @PreAuthorize("hasAnyRole('PI', 'ADMIN')")
    public ResponseEntity<ResponseDTO<MilestoneResponseDTO>> createMilestone(
            @PathVariable String id,
            @Valid @RequestBody MilestoneRequestDTO request
    ) {
        try {
            MilestoneResponseDTO milestone = milestoneService.createMilestone(id, request);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(ResponseDTO.success("Milestone created successfully", milestone));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
    
    @PutMapping("/milestones/{id}")
    @PreAuthorize("hasAnyRole('PI', 'ADMIN')")
    public ResponseEntity<ResponseDTO<MilestoneResponseDTO>> updateMilestone(
            @PathVariable String id,
            @Valid @RequestBody MilestoneRequestDTO request
    ) {
        try {
            MilestoneResponseDTO milestone = milestoneService.updateMilestone(id, request);
            return ResponseEntity.ok(ResponseDTO.success("Milestone updated successfully", milestone));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
    
    @DeleteMapping("/milestones/{id}")
    @PreAuthorize("hasAnyRole('PI', 'ADMIN')")
    public ResponseEntity<ResponseDTO<Void>> deleteMilestone(@PathVariable String id) {
        try {
            milestoneService.deleteMilestone(id);
            return ResponseEntity.ok(ResponseDTO.success("Milestone deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ResponseDTO.error(e.getMessage()));
        }
    }
}
