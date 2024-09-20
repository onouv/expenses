package onosoft.ports.driving;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "accounts")
public class AccountData {

    @Id
    @Column(name = "account_no", length = 25)
    private String accountNo;

    @Column(name = "account_name")
    private String accountName;

    @Column(name = "account_description")
    private String accountDescription;
}
