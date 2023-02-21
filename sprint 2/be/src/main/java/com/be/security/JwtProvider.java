package com.be.security;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Date;
@Component
public class JwtProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);
    private String jwtSecret = "baokhanhjax@gmail.com";
public String generateJwtToken(String userName){
    return Jwts.builder()
            .setSubject(userName)
            .setIssuedAt(new Date())
            .setExpiration(new Date((new Date()).getTime() + (100 * 60 * 60 * 24)))
            .signWith(SignatureAlgorithm.HS512,jwtSecret)
            .compact();
}

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            logger.error("Expired JWT token -> Message: {}", e);
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token -> Message: {}", e);
        } catch (MalformedJwtException e) {
            logger.error("The token invalid format -> Message: {}", e);

        } catch (SignatureException e) {
            logger.error("Invalid JWT Signature -> Message: {}", e);

        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty -> Message: {}", e);
        }
        return false;
    }

}
