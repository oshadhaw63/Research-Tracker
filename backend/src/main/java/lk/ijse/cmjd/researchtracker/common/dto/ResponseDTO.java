package lk.ijse.cmjd.researchtracker.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Generic Response DTO for API responses
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDTO<T> {
    private boolean success;
    private String message;
    private T data;
    
    public static <T> ResponseDTO<T> success(String message, T data) {
        return new ResponseDTO<>(true, message, data);
    }
    
    public static <T> ResponseDTO<T> error(String message) {
        return new ResponseDTO<>(false, message, null);
    }
}
