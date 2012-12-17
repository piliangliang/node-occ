#include "NodeV8.h"
#include "Util.h"
#include "GeometryBuilder.h"
#include "Solid.h"
#include "Mesh.h"
#include "Transformation.h"
#include "Tools.h"

Handle<Value> createBox(const Arguments& args)
{
  HandleScope scope;
  
  if (args.Length() < 1) {
    ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
    return scope.Close(Undefined());
  }
  
  // resulting object
  Handle<Value> obj = Solid::NewInstance(args);  

  return scope.Close(Solid::makeBox(args));
}


void Initialize(Handle<Object> target) 
{
  
  Solid::Init(target);
  Transformation::Init(target);
  Mesh::Init(target);

  target->Set(String::NewSymbol("createBox"),FunctionTemplate::New(createBox)->GetFunction());
  target->Set(String::NewSymbol("writeSTEP"),FunctionTemplate::New(writeSTEP)->GetFunction());
  target->Set(String::NewSymbol("oceVersion"), String::New("0.11"));

}
NODE_MODULE(occ, Initialize)
