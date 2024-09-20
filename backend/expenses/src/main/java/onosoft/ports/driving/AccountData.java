package onosoft.ports.driving;

import jakarta.persistence.*;
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

    @Column(name="account_name")
    private String accountName;

    @Column(name="account_description")
    private String accountDescription;
}
