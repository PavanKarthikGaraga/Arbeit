"use client";
import { useContext, useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Initial auth check
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await refreshToken();
                const data = await response.json();
                if (response.ok) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    // Handle token refresh
    useEffect(() => {
        let intervalId;

        if (user) {
            intervalId = setInterval(async () => {
                try {
                    const response = await refreshToken();
                    const data = await response.json();
                    if (!response.ok) {
                        clearInterval(intervalId);
                        setUser(null);
                        router.replace('/');
                    } else {
                        setUser(data.user);
                    }
                } catch (error) {
                    console.error('Token refresh failed:', error);
                    clearInterval(intervalId);
                    setUser(null);
                    router.replace('/');
                }
            }, 14 * 1000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [user, router]);

    const login = async(username, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Username: username, Password: password }),
            });

            if (!response.ok) {
                return response;
            }

            return response;
        } catch(e) {
            return new Response(JSON.stringify({ error: 'Network error during login' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    const logout = async() => {
        try{
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                setUser(null);  // Clear user state
                router.replace('/');  // Redirect to login page
            }

            return response;
        } catch(e) {
            return new Response(JSON.stringify({ error: 'Network error during logout' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }   

    const register = async(username, password) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Username: username, Password: password }),
            });

            if (!response.ok) {
                return response;
            }

            return response;
        } catch(e) {
            return new Response(JSON.stringify({ error: 'Network error during registration' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    const refreshToken = async () => {
        try {
            const response = await fetch("/api/auth/refresh", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
    
            if (!response.ok) {
                return new Response(JSON.stringify({ error: 'Token refresh failed' }), {
                    status: response.status,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            return response;
        } catch (error) {
            // Return a proper JSON response even for network errors
            return new Response(JSON.stringify({ error: 'Network error during refresh' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, setUser, logout }}>
            {children}
        </AuthContext.Provider> 
    );
}

export function useAuth() {
    return useContext(AuthContext);
}