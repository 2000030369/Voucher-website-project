package com.voucherwebsite.service;

import com.voucherwebsite.entity.Voucher;
import com.voucherwebsite.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    public Voucher saveVoucher(Voucher voucher) {
        return voucherRepository.save(voucher);
    }
    public List<Voucher> getAllVouchers() {
        return voucherRepository.findAll();
    }
    public Voucher getVoucherById(Long id) {
        return voucherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voucher not found with id " + id));
    }
    public boolean existsById(Long id) {
        return voucherRepository.existsById(id);
    }

    public void deleteById(Long id) {
        voucherRepository.deleteById(id);
    }

}
