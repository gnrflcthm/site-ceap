import { AccountType } from "@prisma/client";

export default function(accountType: string | AccountType | undefined): string {
    switch (accountType) {
        case AccountType.CEAP_SUPER_ADMIN:
            return "CEAP Super Admin";
        case AccountType.CEAP_ADMIN:
            return "CEAP Admin";
        case AccountType.MS_ADMIN:
            return "Member School Admin";
        case AccountType.MS_USER:
            return "Member School User";
    }

    return "Undefined User";
}
