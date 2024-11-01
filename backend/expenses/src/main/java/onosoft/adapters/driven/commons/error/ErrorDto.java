package onosoft.adapters.driven.commons.error;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
@EqualsAndHashCode
public class ErrorDto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private final UUID errorId;
    private final List<String> errorMessages;

    public ErrorDto() {
        this.errorId = UUID.randomUUID();
        this.errorMessages = List.of(String.format("Unknown error with ID %s", this.errorId));
    }

    public ErrorDto(String errorMsg) {
        this.errorId = UUID.randomUUID();
        this.errorMessages = List.of(errorMsg);
    }
}
