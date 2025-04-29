package com.voucherwebsite.controller;

import com.voucherwebsite.entity.Voucher;
import com.voucherwebsite.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private VoucherService voucherService;

    // POST add voucher (only for admin panel)
    @PostMapping("/add-voucher")
    public Voucher addVoucher(@RequestBody Voucher voucher) {
        return voucherService.saveVoucher(voucher);
    }
    @DeleteMapping("/delete-voucher/{id}")
    public ResponseEntity<String> deleteVoucher(@PathVariable Long id) {
        if (!voucherService.existsById(id)) {
            return ResponseEntity.badRequest().body("Voucher not found!");
        }
        voucherService.deleteById(id);
        return ResponseEntity.ok("Voucher deleted successfully!");
    }
}
