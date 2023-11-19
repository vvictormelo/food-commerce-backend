import { Customer, Order } from "@prisma/client";
import { PaymentData } from "../interface/PaymentData";
import { api } from "../lib/api";

export default class PaymentService {
    async process(order: Order, customer: Customer, payment: PaymentData) {
        //TODO: Criar o customer
        const customerId = await this.createCustomer(customer)

        console.log("customerId", customerId)

        //TODO: Processar a transação
    }

    private async createCustomer(customer: Customer): Promise<string> {
        const customerResponse = await api.get(`/customer?email=${customer.email}`)

        if (customerResponse.data?.data?.length > 0) {
            return customerResponse.data?.data[0]?.id
        }

        const customerParams = {
            name: customer.fullName,
            email: customer.email,
            mobilePhone: customer.mobile,
            cpfCnpj: customer.document,
            postalCode: customer.zipCode,
            address: customer.street,
            addressNumber: customer.number,
            complement: customer.complement,
            province: customer.neigborhood,
            notificationDisabled: true,
        }

        const response = await api.post("/customer", customerParams)
        
        return response.data?.id
    }
}