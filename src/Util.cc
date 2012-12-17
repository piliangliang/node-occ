#include "Util.h"


void ReadPropertyPointFromArray( Handle<Array>& arr,double* x,double* y, double*z ) 
{
//    Local<Object> obj = value->ToObject();
//    Handle<Array> art = Handle<Array>::Cast(obj);
    int length = arr->Length();
    // int length = obj->Get(String::New("length"))->ToObject()->Uint32Value();

     if (length>=1) {  *x = arr->Get(0)->NumberValue();  }
     if (length>=2) {  *y = arr->Get(1)->NumberValue();  }
     if (length>=3) {  *z = arr->Get(2)->NumberValue();  }
  
}


//void ReadPropertyPoint( Handle<Object>& obj,const char* name,double* x,double* y, double*z ) 
//{
//  if (!obj.IsEmpty()) {
//    // for exemple a THREE.Vector3 
//    // ( we try to read the "x","y","z" property )
//    Handle<Value> v = obj->Get(String::New(name));
//    return ReadPropertyPointFromArray(v->ToObject(),x,y,z);
//  }
//  //xx if (obj->IsArray()) {
//  //xx   ReadPropertyPointFromArray(value,x,y,z);
//  //xx }
//}


double ReadDouble(Handle<Object>& value,const char* name,double defaultValue)
{
   Local<Value> _v = value->ToObject()->Get(String::New(name));
   return _v->ToNumber()->Value();
}

int ReadInt(Handle<Object>& value,const char* name,int defaultValue)
{
   Local<Value> _v = value->ToObject()->Get(String::New(name));
   return _v->ToInteger()->ToInt32()->Value();
}

void ReadXYZ(Handle<Object>& obj,double* x,double* y,double* z)
{
    * x = ReadDouble(obj,"x",0.0);
    * y = ReadDouble(obj,"y",0.0);
    * z = ReadDouble(obj,"z",0.0);
}

void ReadPoint(Local<Value>& value,double* x,double* y, double*z)
{
  if (value->IsArray()) {
    Handle<Array> arr = Handle<Array>::Cast(value);
    ReadPropertyPointFromArray(arr,x,y,z);
       return;
  }
  if (value->IsObject()) {
    // object must have x,y,z property set
    Handle<Object> obj = Handle<Object>::Cast(value);
    ReadXYZ(obj,x,y,z);
   return;
  }
}

void ReadUVW(Handle<Object>& obj,double* x,double* y,double* z)
{
    * x = ReadDouble(obj,"u",0.0);
    * y = ReadDouble(obj,"v",0.0);
    * z = ReadDouble(obj,"w",0.0);
}
/*
void __cdecl boost::throw_exception(class std::exception const &)
{

}
*/