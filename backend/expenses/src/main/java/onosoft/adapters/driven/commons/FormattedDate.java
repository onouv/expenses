package onosoft.adapters.driven.commons;

import lombok.Getter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
public class FormattedDate  {

    private final LocalDate date;

    public FormattedDate(LocalDate date) {
        this.date = date;
    }

    public FormattedDate(String date) {
        this.date = LocalDate.parse(date, DateTimeFormatter.ISO_LOCAL_DATE);
    }

    public String toString() {
        return date.format(DateTimeFormatter.ISO_LOCAL_DATE);
    }
}
