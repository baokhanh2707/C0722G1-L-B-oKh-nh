package furama_resort.services;

public interface ICustomerService extends IService {
    void displayCustomer();

    void addCustomer() throws Exception;

    void editCustomer() throws Exception;
}
