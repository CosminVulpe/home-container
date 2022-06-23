package com.example.Apihomecontainer.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;

@Component
@Slf4j
public class JWTTokenHelper {

    @Value("${jwt.auth.app}")
    private String appName;

    @Value("${jwt.auth.secret_key}")
    private String secretKey;

    @Value("${jwt.auth.expires_in}")
    private int expiresIn;

    private final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;


    public String getUsernameFomToken(String token) {
        String username;
        try {
            username = this.getAllClaimsFromToken(token).getSubject();
            log.info("Username successful");
        } catch (Exception e) {
            username = null;
            log.error("Username failed");
        }
        return username;
    }

    public String generateToken(String username) throws InvalidKeySpecException, NoSuchAlgorithmException {
        return Jwts.builder()
                .setIssuer(appName)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(generateExpirationDate())
                .signWith(SIGNATURE_ALGORITHM, secretKey)
                .compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFomToken(token);
        return (
                username != null &&
                        username.equals(userDetails.getUsername()) &&
                        !isTokenExpired(token)
        );
    }

    public boolean isTokenExpired(String token) {
        Date expireDate = this.getExpirationDate(token);
        return expireDate.before(new Date());
    }

    public Date getIssuedAtDateFromToken(String token) {
        Date issueAt;
        try {
            issueAt = this.getAllClaimsFromToken(token).getIssuedAt();
            log.info("IssuedAt successful");
        } catch (Exception e) {
            issueAt = null;
            log.info("IssuedAt failed");
        }
        return issueAt;
    }

    public String getToken(HttpServletRequest request) {

        String authHeader = getAuthHeader(request);
        return (authHeader != null && authHeader.startsWith("Bearer ") ?
                authHeader.replace("Bearer ", "") : null);
    }

    public String getAuthHeader(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    private Date getExpirationDate(String token) {
        Date expireDate;
        try {
            expireDate = this.getAllClaimsFromToken(token).getExpiration();
            log.info("Date successful");
        } catch (Exception e) {
            expireDate = null;
            log.error("Date failed");
        }
        return expireDate;
    }

    private Date generateExpirationDate() {
        return new Date(new Date().getTime() + expiresIn * 1000L);
    }

    private Claims getAllClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
            log.info("Claim successful");
        } catch (Exception e) {
            claims = null;
            log.error("Claim failed");
        }
        return claims;
    }
}
