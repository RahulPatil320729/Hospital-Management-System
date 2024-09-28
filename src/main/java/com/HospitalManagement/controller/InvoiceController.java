package com.HospitalManagement.controller;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.HospitalManagement.bean.InvoiceBean;
import com.HospitalManagement.service.InvoiceService;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/invoice")
public class InvoiceController {
	
	@Autowired
	InvoiceService invoiceService;
	
	
	 // Endpoint to create a new invoice
    @PostMapping("/create")
    public ResponseEntity<InvoiceBean> createInvoice(@RequestBody InvoiceBean invoiceBean) {
        try {
            // Call service to save the invoice
            InvoiceBean savedInvoice = invoiceService.saveInvoice(invoiceBean);
            // Return response with status 201 (Created)
            return new ResponseEntity<>(savedInvoice, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Handle specific exceptions (e.g., patient or doctor not found)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Handle other exceptions
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
    
    @GetMapping("/getAllData")
    public ResponseEntity<List<InvoiceBean>> getAllInvoices() {
        List<InvoiceBean> invoices = invoiceService.getAllInvoices();
        return ResponseEntity.ok(invoices);
    }
    
    
    
    @GetMapping("getById/{id}")
    public ResponseEntity<InvoiceBean> getInvoiceById(@PathVariable int id) {
        Optional<InvoiceBean> invoice = invoiceService.getInvoiceById(id);
        return invoice.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    
    

    @PutMapping("/update/{id}")
    public ResponseEntity<InvoiceBean> updateInvoice(@PathVariable int id, @RequestBody InvoiceBean invoiceBean) {
        try {
            InvoiceBean updatedInvoice = invoiceService.updateInvoice(id, invoiceBean);
            return ResponseEntity.ok(updatedInvoice);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteInvoice(@PathVariable int id) {
        try {
            String result = invoiceService.deleteInvoice(id);
            return ResponseEntity.ok(result); // Return HTTP 200 OK with success message
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // Return HTTP 404 Not Found with error message
        }
    }

}
