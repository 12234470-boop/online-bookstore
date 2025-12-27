import React, { useState, useEffect } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get user ID
    const userId = localStorage.getItem('userId') || 1;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/orders/${userId}`);
            
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'processing': return { bg: 'rgba(255, 152, 0, 0.1)', color: '#ff9800', text: 'Processing' };
            case 'shipped': return { bg: 'rgba(33, 150, 243, 0.1)', color: '#2196F3', text: 'Shipped' };
            case 'delivered': return { bg: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50', text: 'Delivered' };
            default: return { bg: 'rgba(158, 158, 158, 0.1)', color: '#9E9E9E', text: 'Pending' };
        }
    };

    if (loading) {
        return (
            <div className="container" style={{padding: '40px 20px', textAlign: 'center'}}>
                <h1 style={{color: 'var(--text-primary)', marginBottom: '20px'}}>My Orders</h1>
                <p>Loading your orders...</p>
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
                My Orders
            </h1>
            
            {orders.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                }}>
                    <div style={{fontSize: '4rem', marginBottom: '20px'}}>📦</div>
                    <h2 style={{color: 'var(--text-primary)', marginBottom: '15px'}}>No orders yet</h2>
                    <p style={{color: 'var(--text-secondary)', marginBottom: '30px'}}>
                        Your orders will appear here after you make a purchase.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/books'}
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
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    {orders.map((order) => {
                        const status = getStatusColor(order.status);
                        return (
                            <div key={order.id} style={{
                                backgroundColor: 'var(--bg-card)',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                            >
                                {/* Order Header */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '20px 25px',
                                    borderBottom: '1px solid var(--border)',
                                    backgroundColor: 'rgba(0,0,0,0.05)'
                                }}>
                                    <div>
                                        <h3 style={{
                                            color: 'var(--text-primary)',
                                            margin: '0 0 5px 0',
                                            fontSize: '1.3rem'
                                        }}>
                                            Order #{order.id}
                                        </h3>
                                        <p style={{
                                            color: 'var(--text-secondary)',
                                            margin: '0',
                                            fontSize: '0.9rem'
                                        }}>
                                            {formatDate(order.created_at || new Date())}
                                        </p>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '20px'
                                    }}>
                                        <div style={{
                                            backgroundColor: status.bg,
                                            color: status.color,
                                            padding: '8px 20px',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: '500',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            border: `1px solid ${status.color}`
                                        }}>
                                            {status.text}
                                        </div>
                                        
                                        <div style={{textAlign: 'right'}}>
                                            <div style={{
                                                color: 'var(--text-secondary)',
                                                fontSize: '0.9rem',
                                                marginBottom: '3px'
                                            }}>
                                                Total Amount
                                            </div>
                                            <div style={{
                                                color: '#4CAF50',
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold'
                                            }}>
                                                ${parseFloat(order.total_price || 0).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Order Items */}
                                <div style={{padding: '25px'}}>
                                    <h4 style={{
                                        color: 'var(--text-primary)',
                                        margin: '0 0 20px 0',
                                        fontSize: '1.1rem',
                                        fontWeight: '400'
                                    }}>
                                        Order Items ({order.items?.length || 0})
                                    </h4>
                                    
                                    <div style={{
                                        backgroundColor: 'var(--bg-primary)',
                                        borderRadius: '6px',
                                        border: '1px solid var(--border)',
                                        overflow: 'hidden'
                                    }}>
                                        {order.items && order.items.length > 0 ? (
                                            order.items.map((item, index) => (
                                                <div key={index} style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '18px 20px',
                                                    borderBottom: index < order.items.length - 1 ? '1px solid var(--border)' : 'none'
                                                }}>
                                                    <div style={{flex: 1}}>
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '15px'
                                                        }}>
                                                            <div style={{
                                                                width: '60px',
                                                                height: '90px',
                                                                backgroundColor: 'var(--bg-secondary)',
                                                                borderRadius: '4px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                color: 'var(--text-secondary)',
                                                                fontSize: '2rem'
                                                            }}>
                                                                📚
                                                            </div>
                                                            <div>
                                                                <h5 style={{
                                                                    color: 'var(--text-primary)',
                                                                    margin: '0 0 5px 0',
                                                                    fontSize: '1rem'
                                                                }}>
                                                                    {item.title || `Book #${item.book_id}`}
                                                                </h5>
                                                                <div style={{
                                                                    display: 'flex',
                                                                    gap: '20px',
                                                                    color: 'var(--text-secondary)',
                                                                    fontSize: '0.9rem'
                                                                }}>
                                                                    <span>Quantity: {item.quantity}</span>
                                                                    <span>Price: ${parseFloat(item.price || 0).toFixed(2)} each</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div style={{
                                                        textAlign: 'right',
                                                        minWidth: '100px'
                                                    }}>
                                                        <div style={{
                                                            color: '#4CAF50',
                                                            fontSize: '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                            ${(parseFloat(item.price || 0) * item.quantity).toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{
                                                padding: '30px',
                                                textAlign: 'center',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                No items found for this order
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Order Actions */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: '15px',
                                        marginTop: '25px',
                                        paddingTop: '20px',
                                        borderTop: '1px solid var(--border)'
                                    }}>
                                        <button 
                                            style={{
                                                background: 'transparent',
                                                color: '#2196F3',
                                                border: '1px solid #2196F3',
                                                padding: '10px 25px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.background = '#2196F3';
                                                e.target.style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.background = 'transparent';
                                                e.target.style.color = '#2196F3';
                                            }}
                                        >
                                            Track Order
                                        </button>
                                        
                                        <button 
                                            style={{
                                                background: 'transparent',
                                                color: 'var(--text-primary)',
                                                border: '1px solid var(--border)',
                                                padding: '10px 25px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.borderColor = 'var(--text-primary)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.borderColor = 'var(--border)';
                                            }}
                                        >
                                            View Invoice
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Orders;