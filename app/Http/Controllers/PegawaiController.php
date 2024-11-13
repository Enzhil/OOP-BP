<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pegawai;

class EmployeeController extends Controller
{
    public function index()
    {
        $pegawai = Pegawai::all();
        $data = [
            'message' => 'Get All Resource',
            'data' => $pegawai
        ];
        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $input = [
            'name' => $request->name,
            'gender' => $request->gender,
            'phone' => $request->phone,
            'address' => $request->address,
            'email' => $request->email,
            'status' => $request->status,
            'hired_on' => $request->hired_on
        ];

        $pegawai = Pegawai::create($input);
        $data = [
            'message' => 'Resource is added successfully',
            'data' => $pegawai
        ];
        return response()->json($data, 201);
    }

    public function update(Request $request, $id)
    {
        $pegawai = Pegawai::find($id);
        if ($pegawai) {
            $input = [
                'name' => $request->name ?? $pegawai->name,
                'gender' => $request->gender ?? $pegawai->gender,
                'phone' => $request->phone ?? $pegawai->phone,
                'address' => $request->address ?? $pegawai->address,
                'email' => $request->email ?? $pegawai->email,
                'status' => $request->status ?? $pegawai->status,
                'hired_on' => $request->hired_on ?? $pegawai->hired_on
            ];

            $pegawai->update($input);

            $data = [
                'message' => 'Resource is update succesfully',
                'data' => $pegawai
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'message' => 'Resource not found'
            ];
            return response()->json($data, 404);
        }
    }

    public function destroy($id)
    {
        $pegawai = Pegawai::find($id);
        if ($pegawai) {
            $pegawai->delete();
            $data = [
                'message' => 'Resource is delete succesfully',
                'data' => $pegawai
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'message' => 'Resource not found'
            ];
            return response()->json($data, 404);
        }
    }

    public function show($id)
    {
        $pegawai = Pegawai::find($id);
        if ($pegawai) {
            $data = [
                'message' => 'Data pegawai ditemukan',
                'data' => $pegawai
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'message' => 'Data pegawai tidak ditemukan'
            ];
            return response()->json($data, 404);
        }
    }

    public function search(Request $request)
    {
        $searchTerm = $request->query('name');
        $pegawai = Pegawai::where('name', 'LIKE', '%' . $searchTerm . '%')->get();
        
        $data = [
            'message' => 'Search results',
            'data' => $pegawai
        ];
        
        return response()->json($data, 200);
    }

    public function active()
    {
        $pegawai = Pegawai::where('status', 'active')->get();
        $data = [
            'message' => 'Get Active resource',
            'data' => $pegawai
        ];
        
        return response()->json($data, 200);
    }

    public function inactive()
    {
        $pegawai = Pegawai::where('status', 'inactive')->get();
        $data = [
            'message' => 'Get Inactive resource',
            'data' => $pegawai
        ];
        
        return response()->json($data, 200);
    }

    public function terminated()
    {
        $pegawai = Pegawai::where('status', 'terminated')->get();
        $data = [
            'message' => 'Get Terminated resource',
            'data' => $pegawai
        ];
        
        return response()->json($data, 200);
    }
}
