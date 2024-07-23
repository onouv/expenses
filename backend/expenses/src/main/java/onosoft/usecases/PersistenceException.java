package onosoft.usecases;

public class PersistenceException extends Exception {
    public PersistenceException() {
        super("Problem persisting entity");
    }
}
