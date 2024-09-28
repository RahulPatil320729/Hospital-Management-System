package com.HospitalManagement.service;

import java.util.List;
import java.util.Optional;

import com.HospitalManagement.bean.InvoiceBean;



public interface InvoiceService {
	
	InvoiceBean saveInvoice(InvoiceBean invoiceBean);
	
	List<InvoiceBean> getAllInvoices();
	
	Optional<InvoiceBean> getInvoiceById(int id);
	
	InvoiceBean updateInvoice(int id, InvoiceBean invoiceBean);
	
	String deleteInvoice(int id);

}
