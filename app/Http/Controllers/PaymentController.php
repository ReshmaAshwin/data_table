<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Payments', [
            'payments' => Payment::all()
        ]);
    }

    public function destroy($id)
    {
        $payments = Payment::findOrFail($id);
        $payments->delete();
        return redirect()->back()->with('success', 'Deleted payment successfully');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'email' => 'required|email|unique:payments,email,' . $id,
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:pending,processing,success,failed',

        ]);
        $payments = Payment::findOrFail($id);
        $payments->update([
            'email' => $request->email,
            'amount' => $request->amount,
            'status' => $request->status,

        ]);
        return response()->json(['message' => 'Payment successfully updated'], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:payments,email,',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:pending,processing,success,failed',

        ]);
        Payment::create([
            'email' => $request->email,
            'amount' => $request->amount,
            'status' => $request->status,

        ]);
        return response()->json(['message' => 'Payment successfully Added'], 200);
    }
}
