import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';

interface AddPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setMessage(null);

        const csrfToken = document.querySelector('meta[name=csrf-token]')?.getAttribute('content');
        if (!csrfToken) {
            setMessage({ type: 'error', text: 'CSRF token is missing, Refresh the page' });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': ' application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                credentials: 'same-origin',
                body: JSON.stringify({ email, amount, status }),
            });
            if (response.ok) {
                setMessage({ type: 'success', text: 'Payment added successfully' });

                setEmail('');
                setAmount('');
                setStatus('');

                setTimeout(() => {
                    onClose();
                    window.location.reload();
                }, 1500);
            } else {
                const errorData = await response.json();
                setMessage({ type: 'error', text: errorData.message || 'failed to update payment' });
            }
        } catch (error) {
            console.error('error updating payment:', error);
            setMessage({ type: 'error', text: 'An error occured, Please try again' });
        } finally {
            setLoading(false);
        }
    };
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Payment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-2">
                    {message && (
                        <div className={`rounded p-2 ${message.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                            {message.text}
                        </div>
                    )}
                    <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />

                    <Input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        required
                    />
                    <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded border p-2" required>
                        <option value={''}>Select Status</option>
                        <option value={'pending'}>Pending</option>
                        <option value={'processing'}>Processing</option>
                        <option value={'success'}>Success</option>
                        <option value={'failed'}>Failed</option>
                    </select>
                    <DialogFooter>
                        <Button type="button" onClick={onClose} disabled={loading}>
                            cancel
                        </Button>

                        <Button type="submit" disabled={loading}>
                            {loading ? 'processing' : ' add payment'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddPaymentModal;
