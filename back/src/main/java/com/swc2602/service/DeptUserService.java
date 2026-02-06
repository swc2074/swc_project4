package com.swc2602.service;

import com.swc2602.domain.DeptUser;
import com.swc2602.mapper.DeptUserMapper;
import com.swc2602.repository.DeptUserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DeptUserService {

    private final DeptUserRepository deptUserRepository;
    private final DeptUserMapper deptUserMapper;

    public DeptUserService(DeptUserRepository deptUserRepository, DeptUserMapper deptUserMapper) {
        this.deptUserRepository = deptUserRepository;
        this.deptUserMapper = deptUserMapper;
    }
 
    public DeptUser create(DeptUser deptUser) {
        return deptUserRepository.save(deptUser);
    }

    public List<DeptUser> findAll() {
        return deptUserRepository.findAll();
    }

    public DeptUser findById(Long deptno) {
        return deptUserRepository.findById(deptno).orElse(null);
    }

    public DeptUser update(DeptUser deptUser) {
        return deptUserRepository.save(deptUser);
    }

    public void delete(Long deptno) {
        deptUserRepository.deleteById(deptno);
    }
 

    public List<DeptUser> findByNameKeyword(String keyword) {
        return deptUserMapper.findByNameKeyword(keyword);
    }
}
