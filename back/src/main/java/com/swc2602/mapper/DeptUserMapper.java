package com.swc2602.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.swc2602.domain.DeptUser;

@Mapper
public interface DeptUserMapper { 
	List<DeptUser>  findByNameKeyword(String keyword);
}
