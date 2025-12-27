import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const navigate = useNavigate();

    // Get user ID
    const userId = localStorage.getItem('userId') || 1;

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
            
            if (response.ok) {
                const data = await response.json();
                console.log('Cart items loaded:', data.length, 'items');
                setCartItems(data);
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (bookId, newQuantity) => {
        if (newQuantity < 1) return;
        
        try {
            const response = await fetch(`http://localhost:5000/api/cart/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    bookId,
                    quantity: newQuantity
                })
            });

            if (response.ok) {
                setCartItems(prevItems =>
                    prevItems.map(item =>
                        item.book_id === bookId
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const removeItem = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/remove/${userId}/${bookId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setCartItems(prev => prev.filter(item => item.book_id !== bookId));
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            return total + (price * quantity);
        }, 0);
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert('Cart is empty');
            return;
        }

        try {
            setCheckoutLoading(true);
            const orderData = {
                userId,
                items: cartItems.map(item => ({
                    book_id: item.book_id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: calculateTotal()
            };

            const response = await fetch('http://localhost:5000/api/orders/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                alert('Order placed successfully!');
                setCartItems([]);
                navigate('/orders');
            } else {
                alert('Checkout failed');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Checkout error');
        } finally {
            setCheckoutLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container" style={{padding: '40px 20px', textAlign: 'center'}}>
                <h1 style={{color: 'var(--text-primary)', marginBottom: '20px'}}>Your Shopping Cart</h1>
                <p>Loading your cart items...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{padding: '40px 20px'}}>
            <h1 style={{
                color: 'var(--text-primary)',
                marginBottom: '30px',
                fontSize: '2.5rem',
                fontWeight: '300',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '15px'
            }}>
                Your Shopping Cart
            </h1>
            
            {cartItems.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                }}>
                    <div style={{fontSize: '4rem', marginBottom: '20px'}}>🛒</div>
                    <h2 style={{color: 'var(--text-primary)', marginBottom: '15px'}}>Your cart is empty</h2>
                    <p style={{color: 'var(--text-secondary)', marginBottom: '30px'}}>
                        Add some books to your cart to see them here!
                    </p>
                    <button 
                        onClick={() => navigate('/books')}
                        style={{
                            background: 'transparent',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--text-primary)',
                            padding: '12px 30px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'var(--text-primary)';
                            e.target.style.color = 'var(--bg-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'var(--text-primary)';
                        }}
                    >
                        Browse Books
                    </button>
                </div>
            ) : (
                <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px'}}>
                    {/* Cart Items */}
                    <div>
                        <div style={{
                            backgroundColor: 'var(--bg-card)',
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                            overflow: 'hidden'
                        }}>
                            {cartItems.map((item, index) => {
                                // Use the image_url from backend, with fallback
                                const imageUrl = item.image_url || 
                                    (item.book_id === 1 ? 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1490528560l/4671._SY475_.jpg' :
                                     item.book_id === 2 ? 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657._SY475_.jpg' :
                                     item.book_id === 3 ? 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1532714506l/40961427._SX318_.jpg' :
                                     item.book_id === 4 ? 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320399351l/1885._SY475_.jpg' :
                                     item.book_id === 5 ? 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546071216l/5907._SY475_.jpg' :
                                     item.book_id === 6 ? 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474154022l/3._SY475_.jpg' :
                                     'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop');

                                return (
                                    <div key={item.id} style={{
                                        display: 'flex',
                                        padding: '25px',
                                        borderBottom: index < cartItems.length - 1 ? '1px solid var(--border)' : 'none',
                                        alignItems: 'center',
                                        gap: '20px'
                                    }}>
                                        {/* Book Image */}
                                        <div style={{flexShrink: 0}}>
                                            <img 
                                                src={imageUrl}
                                                alt={item.title}
                                                style={{
                                                    width: '120px',
                                                    height: '180px',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px',
                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                                }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop';
                                                }}
                                            />
                                        </div>
                                        
                                        {/* Book Details */}
                                        <div style={{flex: 1}}>
                                            <h3 style={{
                                                color: 'var(--text-primary)',
                                                margin: '0 0 8px 0',
                                                fontSize: '1.2rem'
                                            }}>
                                                {item.title}
                                            </h3>
                                            <p style={{
                                                color: 'var(--text-secondary)',
                                                margin: '0 0 15px 0',
                                                fontSize: '0.9rem'
                                            }}>
                                                by {item.author}
                                            </p>
                                            
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '15px'
                                            }}>
                                                <span style={{
                                                    color: '#4CAF50',
                                                    fontSize: '1.3rem',
                                                    fontWeight: 'bold'
                                                }}>
                                                    ${parseFloat(item.price || 0).toFixed(2)}
                                                </span>
                                                
                                                {/* Quantity Controls */}
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px'
                                                }}>
                                                    <button 
                                                        onClick={() => updateQuantity(item.book_id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        style={{
                                                            background: 'transparent',
                                                            color: 'var(--text-primary)',
                                                            border: '1px solid var(--border)',
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '4px',
                                                            cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                                                            fontSize: '1.2rem',
                                                            opacity: item.quantity <= 1 ? 0.5 : 1
                                                        }}
                                                    >
                                                        –
                                                    </button>
                                                    <span style={{
                                                        color: 'var(--text-primary)',
                                                        fontSize: '1.1rem',
                                                        minWidth: '40px',
                                                        textAlign: 'center'
                                                    }}>
                                                        {item.quantity}
                                                    </span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.book_id, item.quantity + 1)}
                                                        style={{
                                                            background: 'transparent',
                                                            color: 'var(--text-primary)',
                                                            border: '1px solid var(--border)',
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            fontSize: '1.2rem'
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <span style={{
                                                    color: 'var(--text-primary)',
                                                    fontSize: '1.1rem',
                                                    fontWeight: '500'
                                                }}>
                                                    Item Total: <span style={{color: '#4CAF50'}}>
                                                        ${(parseFloat(item.price || 0) * item.quantity).toFixed(2)}
                                                    </span>
                                                </span>
                                                
                                                <button 
                                                    onClick={() => removeItem(item.book_id)}
                                                    style={{
                                                        background: 'transparent',
                                                        color: '#ff4444',
                                                        border: '1px solid #ff4444',
                                                        padding: '8px 20px',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.9rem',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.background = '#ff4444';
                                                        e.target.style.color = 'white';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.background = 'transparent';
                                                        e.target.style.color = '#ff4444';
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Order Summary */}
                    <div>
                        <div style={{
                            backgroundColor: 'var(--bg-card)',
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                            padding: '25px',
                            position: 'sticky',
                            top: '20px'
                        }}>
                            <h2 style={{
                                color: 'var(--text-primary)',
                                margin: '0 0 25px 0',
                                fontSize: '1.5rem',
                                fontWeight: '300',
                                borderBottom: '1px solid var(--border)',
                                paddingBottom: '15px'
                            }}>
                                Order Summary
                            </h2>
                            
                            <div style={{marginBottom: '25px'}}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '15px',
                                    color: 'var(--text-secondary)'
                                }}>
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span>${calculateTotal().toFixed(2)}</span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '15px',
                                    color: 'var(--text-secondary)'
                                }}>
                                    <span>Shipping</span>
                                    <span style={{color: '#4CAF50'}}>FREE</span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '20px',
                                    paddingTop: '20px',
                                    borderTop: '1px solid var(--border)',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    color: 'var(--text-primary)'
                                }}>
                                    <span>Total</span>
                                    <span style={{color: '#4CAF50'}}>${calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleCheckout}
                                disabled={checkoutLoading}
                                style={{
                                    width: '100%',
                                    background: checkoutLoading ? 'var(--border)' : 'transparent',
                                    color: checkoutLoading ? 'var(--text-secondary)' : 'var(--text-primary)',
                                    border: '1px solid var(--text-primary)',
                                    padding: '16px',
                                    borderRadius: '4px',
                                    cursor: checkoutLoading ? 'not-allowed' : 'pointer',
                                    fontSize: '1.1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '15px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    if (!checkoutLoading) {
                                        e.target.style.background = 'var(--text-primary)';
                                        e.target.style.color = 'var(--bg-primary)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!checkoutLoading) {
                                        e.target.style.background = 'transparent';
                                        e.target.style.color = 'var(--text-primary)';
                                    }
                                }}
                            >
                                {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
                            </button>
                            
                            <button 
                                onClick={() => navigate('/books')}
                                style={{
                                    width: '100%',
                                    background: 'transparent',
                                    color: 'var(--text-primary)',
                                    border: '1px solid var(--border)',
                                    padding: '16px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.borderColor = 'var(--text-primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.borderColor = 'var(--border)';
                                }}
                            >
                                Continue Shopping
                            </button>
                            
                            <div style={{
                                marginTop: '25px',
                                padding: '15px',
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                borderRadius: '4px',
                                border: '1px solid var(--border)'
                            }}>
                                <p style={{
                                    margin: '0',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.5'
                                }}>
                                    <span style={{color: '#4CAF50', fontWeight: 'bold'}}>✓ Free shipping</span> on all orders
                                    <br/>
                                    <span style={{color: '#4CAF50', fontWeight: 'bold'}}>✓ Easy returns</span> within 30 days
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;