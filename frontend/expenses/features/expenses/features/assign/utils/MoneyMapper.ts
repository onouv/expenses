import MoneyT from "@/common/types/MoneyT";
import AmountT from "@/common/types/AmountT";
import CurrencyE from "@/common/types/CurrencyE";

export default abstract class MoneyMapper {
  protected static stripLeadingZeroes(raw: string): string {
    const ANY_LEADING_ZERO_GROUPS = /^(0+,?)+/g;

    return raw.replace(ANY_LEADING_ZERO_GROUPS, "");
  }

  protected static stripAllThousandsSeparators(noLeadZeros: string): string {
    const ANY_THOUSANDS_SEPARATOR = /,/g;

    return noLeadZeros.replace(ANY_THOUSANDS_SEPARATOR, "");
  }

  protected static splitComponents(noSeparators: string): AmountT {
    const PRE_DECIMAL_POINT_NUMBER = /^(\d{1,3},?)*/g;
    const majors = noSeparators.split(PRE_DECIMAL_POINT_NUMBER);
    const major = majors.length > 0 ? parseInt(majors[0]) : 0;

    const POST_DECIMAL_POINT_NUMBER = /.\d{1,2}$/g;
    const minors = noSeparators.split(POST_DECIMAL_POINT_NUMBER);
    const minor = minors.length > 0 ? parseInt(minors[0]) : 0;

    return {
      major,
      minor,
    };
  }

  public static asAmount(rawAmount: string): AmountT {
    const noLeadZeros = this.stripLeadingZeroes(rawAmount);
    const noSeparators = this.stripAllThousandsSeparators(noLeadZeros);

    return this.splitComponents(noSeparators);
  }

  public static asMoney(rawAmount: string, currency: CurrencyE): MoneyT {
    const amount = this.asAmount(rawAmount);

    return {
      amountMajor: amount.major,
      amountMinor: amount.minor,
      currency,
    };
  }
}
