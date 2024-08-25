package com.laggercodes.lakesidehotel.security.user;

import com.laggercodes.lakesidehotel.model.User;
import com.laggercodes.lakesidehotel.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class HotelUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public HotelUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return HotelUserDetails.buildUserDetails(user);
    }
}
